export default function AlertModal(props) {
  let {title, message} = props

  const dismissErrorHandler = () => {
    props.onErrorClick();
  };

  return (
    <div>
      <div className='' onClick={dismissErrorHandler} />
        <header className=''>
          <h2>{props.title}</h2>
        </header>
        <div className=''>
          <p>{props.message}</p>
        </div>
        <footer className=''>
          <Button onClick={dismissErrorHandler}>Okay</Button>
        </footer>
    </div>
  );
};

