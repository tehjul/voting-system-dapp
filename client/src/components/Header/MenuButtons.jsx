import "./MenuButton.css";

function MenuButtons({ setCurrentPage, isOwner }) {

  const voter = () => {
    setCurrentPage("Voter");
  }

  const administrator = () => {
    setCurrentPage("Administrator");
  }

  return (
    <div className="menu-button">
      {isOwner && <button onClick={voter}>Voter</button>}
      {isOwner && <button onClick={administrator}>Administrator</button>}
    </div>
  );
}

export default MenuButtons;