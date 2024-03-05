import styles from "./App.module.css";
import DragAndDrop from "./components/DragAndDrop";

const App = () => {
  return (
    <div className={styles.layout}>
      <DragAndDrop />
    </div>
  );
};

export default App;
