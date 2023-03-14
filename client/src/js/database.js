import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const name = 'jate'
  const jateDb = await openDB(name, 1);
  const tx = jateDb.transaction('name', 'readonly');
  const store = tx.objectStore('name');
  const request = store.getAll();
  const result = await request();
  await tx.complete;
return result;
}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.complete;
  console.log('Content added to database');
}
initdb();
