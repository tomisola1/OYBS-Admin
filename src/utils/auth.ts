export const isAuthenticated = () => {
    if(typeof window !== 'undefined'){
        // now access your localStorage
        localStorage.getItem('token');
      }
}
