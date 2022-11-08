function MenuButtons({ setCurrentPage, isOwner }) {

  const voter = () => {
    setCurrentPage("Voter");
  }

  const administrator = () => {
    setCurrentPage("Administrator");
  }

  return (
    <>
      {isOwner && <button onClick={voter}>Voter</button>}
      {isOwner && <button onClick={administrator}>Administrator</button>}
    </>
  );
}

export default MenuButtons;