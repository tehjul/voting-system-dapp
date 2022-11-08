function MenuButtons({setCurrentPage}) {

  const voter = () => {
    setCurrentPage("Voter");
  }

  const administrator = () => {
    setCurrentPage("Administrator");
  }

  return (
    <>
    <button onClick={voter}>Voter</button>
    <button onClick={administrator}>Administrator</button>
    </>
  );
}

export default MenuButtons;