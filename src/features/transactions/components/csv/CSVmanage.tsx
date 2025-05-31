import { useRef } from "react";
import { useTransactions } from "../../store/transactions.context";
import CSVUploader from "./CSVUploader";
import CSVDownloader from "./CSVDownloader";

const CSVManage = () => {
  const {
    state: { transactions },
    dispatch,
  } = useTransactions("CSVManage");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={(e) => CSVUploader.handleFileChange(e, transactions, dispatch )}
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex sm:flex-row flex-wrap gap-2 mb-4">
      <CSVUploader
        onClick={handleFileClick}
        transactions={transactions}
        dispatch={dispatch}
      />
        <CSVDownloader transactions={transactions} />
      </div>
    </>
  );
};

export default CSVManage;
