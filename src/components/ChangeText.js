const ChangeText = (text, idText) => {
   let str;
   if (idText === 'title') {
      str = text.split(' ');
      if (str.length > 5) {
         return `${str.slice(0, 5).join(' ')}...`;
      }
   }
   if (idText === 'overview') {
      if (!text.length) {
         return 'Описание отсутствует';
      }
      str = text.split(' ');

      if (str.length > 25) {
         return `${str.slice(0, 25).join(' ')}...`;
      }
   }
   return text;
};

export default ChangeText;