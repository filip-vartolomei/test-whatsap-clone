import ChatContainer from './components/Chat/ChatContainer';
import SideBar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="mx-auto">
        <div className="h-screen">
          <div className="flex h-full">
            <SideBar />
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
