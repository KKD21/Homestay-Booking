import { Link } from "react-router-dom";
import { deleteProperty, getAllProperties } from "../services/supabase/properties";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { useState } from "react";
import { PAGINATION_STEP } from "../utils/Utils";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "./TableSkeleton";
import DropdownEditMenu from "./DropdownEditMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Badge from "./Badge";

function PropertiesTable({ headings, filter }) {
  const [page, setPage] = useState(0);
  const {
    data: { properties, count } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties", page, filter],
    queryFn: async () => await getAllProperties(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP - 1, filter),
    staleTime: 60 * 60,
  });

  if (isLoading) return <TableSkeleton headings={headings.map((item) => item.label)} />;

  if (isError) return <h1>Error, Please check your network and try again</h1>;

  if (!properties?.length && !isError) return <h1>No property was found</h1>;
  
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Modal>
                <Table>
                  <Table.Head headings={headings} />

                  {properties?.map((item, index) => (
                    <Table.Row key={item.id}>
                      {headings.find((col) => col.label === "#" && col.show) && (
                        <Table.Cell>
                          <span className="inline-block w-32 aspect-video">
                            <img
                              className="w-full aspect-video"
                              src={`${import.meta.env.VITE_SUPABASE_IMGS_URL}/${item.thumbnail}`}
                              alt={item.name}
                            />
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "property" && col.show) && (
                        <Table.Cell>
                          <span>{item.name}</span> <br />
                          <span className="italic font-extralight text-slate-500">
                            {item.address}, {item.city}
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "type" && col.show) && (
                        <Table.Cell>{item.property_type}</Table.Cell>
                      )}

                      {headings.find((col) => col.label === "rooms" && col.show) && (
                        <Table.Cell>{item.rooms_count || 0}</Table.Cell>
                      )}
                      
                      {headings.find((col) => col.label === "status" && col.show) && (
                        <Table.Cell>
                          {item.status === "available" ? (
                            <Badge status={"success"}>Available</Badge>
                          ) : (
                            <Badge status={"warning"}>Unavailable</Badge>
                          )}
                        </Table.Cell>
                      )}
                      
                      {headings.find((col) => col.label === "actions" && col.show) && (
                        <Table.Cell>
                          <DropdownEditMenu align="right" className="relative inline-flex">
                            <li>
                              <Link
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
                                to={`/properties/edit/${item.id}`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPen} />
                                </span>
                                <span>Edit</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                to={`/properties/${item.id}/rooms`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPlus} />
                                </span>
                                <span>View Rooms</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                to={`/rooms/new?property_id=${item.id}`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPlus} />
                                </span>
                                <span>Add Room</span>
                              </Link>
                            </li>
                            <li>
                              <DeletionModal
                                targetName={item.name}
                                mutationFuntion={() => deleteProperty(item.id)}
                                queryKey="properties"
                                modalKey={`delete-property-${item.id}`}
                              />
                            </li>
                          </DropdownEditMenu>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / PAGINATION_STEP)}
        onPageChange={setPage}
      />
    </>
  );
}

export default PropertiesTable;