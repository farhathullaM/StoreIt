const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="text-5xl max-sm:text-3xl font-semibold text-[#121111] pt-4 py-5">
      {text}
    </h1>
  );
};

export default Title;
