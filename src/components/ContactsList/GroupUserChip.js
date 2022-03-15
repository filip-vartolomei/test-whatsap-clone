function GroupUserChip({ user, handleRemoveUser }) {
  return (
    <span className="rounded-full text-grey-dark bg-grey-light font-semibold text-xs flex items-center">
      <img className="rounded-full w-6 h-6" alt="group-user" src={user.imgSrc} />
      <span className="flex items-center px-3 py-2">{user.userName}</span>
      <button
        className="text-grey hover:text-grey-darker flex cursor-pointer"
        style={{ outline: 'none' }}
        onClick={() => handleRemoveUser(user)}
      >
        <svg
          className="w-2 mr-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </button>
    </span>
  );
}

export default GroupUserChip;
