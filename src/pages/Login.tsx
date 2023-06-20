interface IProps {
  name: string
}

const App: React.FC<IProps> = (props) => {
  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

export default App;