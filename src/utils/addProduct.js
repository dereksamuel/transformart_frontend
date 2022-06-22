const onClickModel = (id) => {
  const $model = document.getElementById(id);

  $model.click();
};

const toUrl = (blob) => URL.createObjectURL(blob);

export {
  onClickModel,
  toUrl
};
