const reviseFormData = formData => {
   const revisedFormData = {};

   for(let key in formData) {
      if(formData[key] !== '') {
         revisedFormData[key] = formData[key];
      }
   }
   return revisedFormData;
}
export default reviseFormData;