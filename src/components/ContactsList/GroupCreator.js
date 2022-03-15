import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';
import GroupUserChip from './GroupUserChip';

function GroupCreator(props) {
  const [groupName, setGroupName] = useState('');
  const { contactsStore } = useStores();

  const { showGroupCreation, toggleShowGroupCreation, group, removeUserFromGroup, createGroup } =
    contactsStore;

  return (
    <>
      {!showGroupCreation && (
        <div
          className="px-3 flex items-center cursor-pointer hover:bg-grey-light"
          onClick={() => toggleShowGroupCreation()}
        >
          <div>
            <svg width="36" height="36" viewBox="0 0 212 212" preserveAspectRatio="xMidYMid meet">
              <path
                d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25Z"
                fill="#DFE5E7"
              ></path>
              <path
                clipRule="evenodd"
                d="M102.282 77.286c0 10.671-8.425 19.285-18.94 19.285s-19.003-8.614-19.003-19.285C64.339 66.614 72.827 58 83.342 58s18.94 8.614 18.94 19.286Zm48.068 2.857c0 9.802-7.738 17.714-17.396 17.714-9.658 0-17.454-7.912-17.454-17.714s7.796-17.715 17.454-17.715c9.658 0 17.396 7.913 17.396 17.715Zm-67.01 29.285c-14.759 0-44.34 7.522-44.34 22.5v11.786c0 3.536 2.85 4.286 6.334 4.286h76.012c3.484 0 6.334-.75 6.334-4.286v-11.786c0-14.978-29.58-22.5-44.34-22.5Zm43.464 1.425c.903.018 1.681.033 2.196.033 14.759 0 45 6.064 45 21.043v9.642c0 3.536-2.85 6.429-6.334 6.429h-32.812c.697-1.993 1.141-4.179 1.141-6.429l-.245-10.5c0-9.561-5.614-13.213-11.588-17.1-1.39-.904-2.799-1.821-4.162-2.828a.843.843 0 0 1-.059-.073.594.594 0 0 0-.194-.184c1.596-.139 4.738-.078 7.057-.033Z"
              ></path>
            </svg>
          </div>
          <div>
            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">Create a group</div>
          </div>
        </div>
      )}

      {showGroupCreation && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xs mb-2 text-green-dark">Members</div>

            <div className="flex flex-wrap">
              {!group.length && (
                <p className="text-xs italic text-grey">
                  Please select a user to start adding members
                </p>
              )}
              {
                <div className="flex flex-wrap justify-left mx-2 items-end">
                  {group.map((user) => (
                    <GroupUserChip
                      key={user.id}
                      user={user}
                      handleRemoveUser={removeUserFromGroup}
                    />
                  ))}
                </div>
              }
            </div>

            <input
              type="text"
              placeholder="Name of the group"
              style={{ outline: 'none' }}
              className="bg-grey-lighter border-b-2 border-grey-darker mt-4 w-full appearance-none"
              onChange={(evt) => setGroupName(evt.target.value)}
            />

            <div className="flex justify-between mt-4">
              <button
                className="bg-transparent hover:bg-grey-light text-grey font-bold py-2 px-4 rounded-full"
                onClick={() => toggleShowGroupCreation()}
              >
                Cancel
              </button>
              <button
                className={`bg-green-dark hover:bg-green text-white font-bold py-2 px-4 rounded-full ${
                  group.length === 0 || !groupName ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={group.length === 0 || !groupName}
                onClick={() => createGroup(groupName)}
              >
                Create group
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default observer(GroupCreator);
