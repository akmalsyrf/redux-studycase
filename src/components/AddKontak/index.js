import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { addKontak, getListKontak, updateKontak } from "../../actions/KontakAction";

export default function AddKontak() {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [id, setId] = useState("");

  const { addKontakResult, detailKontakResult, updateKontakResult } = useSelector((state) => state.KontakReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      //update kontak
      console.log("4.Submit update kontak");
      dispatch(updateKontak({ id: id, nama: nama, noHp: noHp }));
    } else {
      //add kontak
      dispatch(addKontak({ nama: nama, noHp: noHp }));
    }
  };

  useEffect(() => {
    if (addKontakResult || updateKontakResult) {
      dispatch(getListKontak());
      setNama("");
      setNoHp("");
      setId(false);
    }
  }, [addKontakResult, updateKontakResult, dispatch]);

  useEffect(() => {
    if (detailKontakResult) {
      console.log("3.Data detail kontak masuk ke form", detailKontakResult);
      setNama(detailKontakResult.nama);
      setNoHp(detailKontakResult.noHp);
      setId(detailKontakResult.id);
    }
  }, [detailKontakResult, dispatch]);

  return (
    <div>
      <h4>{id ? "Edit Kontak" : "Add kontak"}</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nama" placeholder="Nama ..." value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="number" name="noHp" placeholder="noHp ..." value={noHp} onChange={(e) => setNoHp(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
