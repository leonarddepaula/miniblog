import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        // busca
        if (search) {
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);

        //return () => unsubscribe(); // Cleanup da assinatura para evitar vazamento de memória
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    loadData();

    //return () => setCancelled(true); // Cleanup para evitar vazamento de memória
  }, [docCollection, documents, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { documents, loading, error };
};
