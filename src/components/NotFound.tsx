interface NotFoundProps {
  message: string;
}

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className="w-full h-20 border bg-destructive/20 flex items-center justify-center">
      {message}
    </div>
  );
};

export default NotFound;
