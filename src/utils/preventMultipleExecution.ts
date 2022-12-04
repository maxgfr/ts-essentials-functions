let isCalled = false;
// eslint-disable-next-line @typescript-eslint/no-empty-function
let timer = setTimeout(() => {}, 0);

export const preventMultipleExecution = (
  functionToBeCalled: Function,
  interval = 1000,
) => {
  if (!isCalled) {
    isCalled = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCalled = false;
    }, interval);
    return functionToBeCalled();
  }
};
