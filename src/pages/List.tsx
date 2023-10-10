import ListEntry from "../components/ListEntry.tsx";

function List(props) {
  return (
    <>
      <h1>List</h1>
      <ListEntry sugar={53} time={'01:09'} mood={1} />
      <ListEntry sugar={72} time={'09:01'} mood={4} />
      <ListEntry sugar={34} time={'11:11'} mood={3} />
      <ListEntry sugar={66} time={'23:45'} mood={5} />
      <ListEntry sugar={80} time={'08:09'} mood={2} comment="gdfksgjkdsfgjkfds\nfsgfdgsdg" mealType={4}/>
      <ListEntry sugar={200} time={'08:09'} mood={1} comment="Almost died" mealType={1} />
    </>
  );
}

export default List;