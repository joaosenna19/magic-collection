'use client'

import { useSearchParams } from "next/navigation";

const AddCardsModal = () => {

    const searchParams = useSearchParams();
    const modal = searchParams.get("addmodal");

  return(modal && ( <h1>I'm a modal</h1> ));
};

export default AddCardsModal;
