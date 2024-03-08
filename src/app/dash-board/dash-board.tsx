import { useState } from 'react';
import styles from './dash-board.module.scss';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashBoardProps {}

interface DataItem {
  id: number;
  name: string;
  age: string;
  email: string;
}
const initialData: DataItem[] = [
  { id: 1, name: 'John Doe', age: '30', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', age: '25', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', age: '35', email: 'bob@example.com' },
  // Add more dummy data as needed
];

export function DashBoard(props: DashBoardProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<DataItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(2); // Change the number of items per page as needed
  const [newItem, setNewItem] = useState<DataItem>({
    id: 0,
    name: '',
    age: '',
    email: '',
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>();

  // Pagination
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: DataItem[] = data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  // Sorting
  const sortBy = (key: keyof DataItem) => {
    const sortedData = [...data].sort((a, b) =>
      a[key].toString().localeCompare(b[key].toString())
    );
    setData(sortedData);
  };

  // CRUD actions
  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const id = data.length + 1;
    setNewItem({ ...newItem, id });
    setData([...data, newItem]);
    setNewItem({ id: 0, name: '', age: '', email: '' });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/logout');

      if (response.status === 200) {
        localStorage.removeItem('token');
        toast.success('Logout successful');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  //handling edit button and setting id of task user want to edit
  const handleEdit = (itemId: number) => {
    setIsEdit(true);
    setItemId(itemId);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    itemId: number
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem('editEmail') as HTMLInputElement;
    const age = form.elements.namedItem('editAge') as HTMLInputElement;
    const name = form.elements.namedItem('editName') as HTMLInputElement;

    const editedItem = {
      id: itemId,
      name: name.value,
      age: age.value,
      email: email.value,
    };

    const updatedData = data.map((item) =>
      item.id === itemId ? editedItem : item
    );
    console.log(editedItem);
    setData(updatedData);
    setIsEdit(false);
    setItemId(itemId);
  };

  return (
    <div className={styles.tableContainer}>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy('id')}>ID</th>
            <th onClick={() => sortBy('name')}>Name</th>
            <th onClick={() => sortBy('age')}>Age</th>
            <th onClick={() => sortBy('email')}>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {isEdit && item.id === itemId ? (
                <h2>Editing</h2>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.addForm}>
        <h2>Add New Item</h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Age"
            value={newItem.age}
            onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      {isEdit ? (
        <>
          {' '}
          <form
            className={styles.addForm}
            onSubmit={(e) => {
              if (itemId) handleSubmit(e, itemId);
            }}
          >
            <h2>Update Item</h2>
            <input
              type="text"
              placeholder="Name"
              name="editName"
              // value={newItem.name}
              //onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Age"
              name="editAge"
              //value={newItem.age}
              //onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              name="editEmail"
              // value={newItem.email}
              // onChange={(e) =>
              //   setNewItem({ ...newItem, email: e.target.value })
              // }
            />
            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DashBoard;
