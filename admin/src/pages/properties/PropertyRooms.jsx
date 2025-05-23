import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../../services/supabase/properties";
import { getAllRoomsByPropertyId } from "../../services/supabase/rooms";
import Table from "../../components/Table/Table";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPen } from "@fortawesome/free-solid-svg-icons";
import DeletionModal from "../../components/DeletionModal";
import DropdownEditMenu from "../../components/DropdownEditMenu";
import Badge from "../../components/Badge";
import { useState } from "react";

function PropertyRooms() {
  const { id } = useParams();
  const [headings] = useState([
    { label: "#", show: true },
    { label: "name", show: true },
    { label: "type", show: true },
    { label: "beds", show: true },
    { label: "price", show: true },
    { label: "status", show: true },
    { label: "actions", show: true },
  ]);

  // Fetch property data
  const { data: property, isLoading: isLoadingProperty } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => await getPropertyById(id),
  });

  // Fetch rooms for this property
  const { data: rooms, isLoading: isLoadingRooms } = useQuery({
    queryKey: ["property-rooms", id],
    queryFn: async () => await getAllRoomsByPropertyId(id),
    enabled: !!id,
  });

  if (isLoadingProperty || isLoadingRooms) return <LoadingSpinner />;

  if (!property) return <div>Property not found</div>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Rooms for {property.name}</h1>
        <Link
          to={`/rooms/new?property_id=${id}`}
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <FontAwesomeIcon icon={faAdd} />
          <span>Add Room</span>
        </Link>
      </div>

      {rooms && rooms.length > 0 ? (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table>
                  <Table.Head headings={headings} />

                  {rooms.map((room) => (
                    <Table.Row key={room.id}>
                      {headings.find((col) => col.label === "#" && col.show) && (
                        <Table.Cell>
                          <span className="inline-block w-32 aspect-video">
                            <img
                              className="w-full aspect-video"
                              src={`${import.meta.env.VITE_SUPABASE_IMGS_URL}/${room.thumbnail}`}
                              alt={room.name}
                            />
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "name" && col.show) && (
                        <Table.Cell>
                          <span>{room.name}</span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "type" && col.show) && (
                        <Table.Cell>
                          <span>{room.room_type || "Standard"}</span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "beds" && col.show) && (
                        <Table.Cell>
                          <span>
                            {room.bed_count || 1} {room.bed_type || "Single"} bed(s)
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "price" && col.show) && (
                        <Table.Cell>
                          <span>₹{room.price}</span>
                          {room.discount > 0 && (
                            <span className="text-xs text-green-600 ml-1">(-{room.discount}%)</span>
                          )}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "status" && col.show) && (
                        <Table.Cell>
                          {room.available ? (
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
                                to={`/rooms/edit/${room.id}`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPen} />
                                </span>
                                <span>Edit</span>
                              </Link>
                            </li>
                          </DropdownEditMenu>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No rooms found for this property</p>
          <Link
            to={`/rooms/new?property_id=${id}`}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            <FontAwesomeIcon icon={faAdd} />
            <span>Add Your First Room</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PropertyRooms;