import { useState, useEffect } from 'react';

export default function NoConnectNetwork() {
   const [online, setOnline] = useState(navigator.onLine);

   useEffect(() => {
      const handleStatusChange = () => {
         setOnline(navigator.onLine);
      };

      window.addEventListener('online', handleStatusChange);
      window.addEventListener('offline', handleStatusChange);

      return () => {
         window.removeEventListener('online', handleStatusChange);
         window.removeEventListener('offline', handleStatusChange);
      };
   }, [online]);

   return online;
}
