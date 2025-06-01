import { useRef } from "react";
import { useTransactions } from "../../store/transactions.context";
import CSVUploader from "./CSVUploader";
import CSVDownloader from "./CSVDownloader";
import { useAlert } from "../../../../shared/store/alert/alert.context";

const CSVManage = () => {
  const {
    state: { transactions },
    dispatch,
  } = useTransactions("CSVManage");
  const { showAlert } = useAlert();

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
        onChange={(e) =>
          CSVUploader.handleFileChange(e, transactions, dispatch, showAlert)
        }
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex sm:flex-row flex-wrap gap-2 mb-4">
        <CSVUploader
          onClick={handleFileClick}
          transactions={transactions}
          dispatch={dispatch}
          showAlert={showAlert}
        />
        <CSVDownloader transactions={transactions} showAlert={showAlert} />
      </div>
    </>
  );
};

export default CSVManage;
