

// const TruncatedText = ({ text }) => {
//   // Check if the text length is greater than 10 characters
//   const truncatedText = text.length > 10 ? `${text.slice(0, 10)}...` : text;

//   return truncatedText;
// };

// export default TruncatedText;


const TruncatedText = ({ text, maxLength, Element= 'div', className }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Element
    className={className}
      style={{
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
      {truncatedText}
    </Element>
  );
};

export default TruncatedText;