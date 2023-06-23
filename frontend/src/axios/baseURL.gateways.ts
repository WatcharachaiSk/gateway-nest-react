const baseURLGateways =
  import.meta.env.VITE_REACT_ENVIRONMENT === "dev"
    ? import.meta.env.VITE_APP_API_URL_GATEWAYS_DEV
    : import.meta.env.VITE_APP_API_URL_GATEWAYS_PROD;
export default baseURLGateways;