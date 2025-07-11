import { fetchUser } from "@/app/lib/data";
import { updateUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUser = async ({params}) => {
  const {id} = params
  const user = await fetchUser(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="text" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="text" name="password" placeholder="12345678" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder={user.address}
          />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected = {user.isAdmin}>Yes</option>
            <option value={false} selected = {!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected = {user.isActive}>Yes</option>
            <option value={false} selected = {!user.isActive}>No</option>
          </select>
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUser;
