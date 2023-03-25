const helperTextResolver = (val: boolean | null, text: string) => {
  return val ? text : "";
};

export default helperTextResolver;
