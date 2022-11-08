function Desc({owner, accounts}) {

  return (
    <>
    <h3>Current administrator is : {owner}</h3>
      {
        accounts ?
          <p>Connected with wallet {accounts[0]}</p>
          :
          <p>Connect your wallet first to add new proposals or to vote.</p>
      }
    </>

  );
}

export default Desc;
