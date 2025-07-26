import FileList from "@/components/Files/FileList";
import SingleImageUpload from "@/components/ImageUpload/SingleImageUpload";
import SheetWrapper from "@/components/ui/SheetWrapper";
import Upload from "@/components/ui/Upload";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-2 px-4 max-sm:px-2 bg-[#ecfcff] min-h-screen">
      <SheetWrapper
        title="Upload Image"
        trigger={<Upload />}
        children={<SingleImageUpload />}
        side="right"
      />

      <FileList />
    </div>
  );
};

export default Home;
