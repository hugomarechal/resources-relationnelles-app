import { useState } from "react";
import TextArea from "../Form/TextArea";
import FloatingInput from "../Form/FloatingInput";

const RessourceForm = () => {
  const [formData, setFormData] = useState({
    contenu: "",
    website: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <FloatingInput
        type="url"
        label="Site internet"
        value={formData.website}
        name="website"
        onChange={handleChange}
        required
        helperText="Entrez une URL valide (ex: https://mon-site.com)"
      />

      <TextArea
        name="contenu"
        value={formData.contenu}
        onChange={handleChange}
        placeholder="Écris le contenu ici ..."
        label="Contenu de la ressource"
        required={true}
      />
    </>
  );
};

export default RessourceForm;
