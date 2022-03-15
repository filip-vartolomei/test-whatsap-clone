import ChatUserImage from '../Chat/ChatUserImage';

function Contact({ contact, onContactClick }) {
  const handleOnClick = () => {
    onContactClick(contact);
  };

  return (
    <div
      key={contact.id}
      onClick={handleOnClick}
      className="px-3 flex items-center cursor-pointer bg-white hover:bg-grey-lighter"
    >
      <ChatUserImage imgSrc={contact.imgSrc} />

      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
        <div className="flex items-baseline justify-between">
          <p className="text-grey-darkest">{contact.userName}</p>
        </div>
        <p className="text-grey-dark mt-1 text-sm">{contact.status}</p>
      </div>
    </div>
  );
}

export default Contact;
