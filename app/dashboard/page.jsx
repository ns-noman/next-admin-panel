import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transaction from "../ui/dashboard/transaction/transaction";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <Transaction/>
        <Chart/>
      </div>
      <div className={styles.side}>
        <Rightbar/>
      </div>
    </div>
  );
};

export default Dashboard;