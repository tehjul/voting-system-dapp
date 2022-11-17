function MenuButtons({ setCurrentPage, isOwner }) {

  const voter = () => {
    setCurrentPage("Voter");
  }

  const administrator = () => {
    setCurrentPage("Administrator");
  }

  return (
    <div className="menu-button">
      {isOwner && <button className="menu-btn" onClick={voter}>Voter</button>}
      {isOwner && <button className="menu-btn" onClick={administrator}>Administrator</button>}
    </div>
  );
}

export default MenuButtons;