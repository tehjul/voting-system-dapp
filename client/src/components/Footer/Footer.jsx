function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h3>More resources</h3>
      <Link uri={"https://alyra.fr/"} text={"Alyra"} />
      <Link uri={"https://formation.alyra.fr/"} text={"Alyra courses"} />
      <Link uri={"http://discord.alyra.fr/"} text={"Alyra discord"} />
    </footer >
  );
}

export default Footer;
