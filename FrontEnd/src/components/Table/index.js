const TruncatedTableCell = (props) => {
    const { text, maxLength } = props;

    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  
    return <td>{truncatedText}</td>;
  };
  
  export default TruncatedTableCell;
  