import { useState } from "react";
import { Link } from "react-router-dom";
import PropertiesTable from "../components/PropertiesTable";
import SectionContainer from "../ui/SectionContainer";
import FilterButton from "../components/DropdownFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddNewLink from "../components/AddNewLink";
import PropertiesFilter from "../components/PropertiesFilter";

const tableHeadings = ["#", "property", "type", "rooms", "status", "actions"];

function Properties() {
  const [filter, setFilter] = useState(null);
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  return (
    <SectionContainer label={"Properties"} description={"List of all the available properties"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5 gap-5">
        <PropertiesFilter setFilter={setFilter} classNames="w-full xs:max-w-44 mb-5 xs:mb-0" />
        
        <div className="flex gap-5">
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />
          <AddNewLink link={"/properties/new"} />
        </div>
      </div>
      <PropertiesTable headings={headings} filter={filter} />
    </SectionContainer>
  );
}

export default Properties;