import {
  Outlet,
  useOutletContext,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { ThemeColor } from "../../types/Enum";
import { useHome } from "./Home";

import { iconTrashPath, iconChartPath, iconEditPath } from "../../assets/icon";
import useApi from "../../hooks/useApi";

interface ShortenContext {
  toggleEdit: (urlID?: string) => void;
}

const Shorten = (): JSX.Element => {
  const { baseShorten } = useApi();
  const { urlLists, onDelete } = useHome();
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const toggleEdit = (urlID: string): void => {
    if (currentRoute.pathname === "/home")
      return navigate(`/home/edit/${urlID}`);
    return navigate("/home");
  };

  if (urlLists === null || urlLists === undefined) return <></>;
  return (
    <div className="absolute top-52 mb-10 flex w-full justify-center px-10">
      <ul className="mb-5 grid w-full grid-cols-1 justify-items-center gap-x-5 gap-y-5 xl:w-1/2 xl:grid-cols-2">
        {urlLists.urlList.map((urlList) => (
          <li
            key={urlList.urlId}
            id={urlList.urlId}
            className="w-full max-w-lg"
          >
            <div
              className={`lg-Pseudo box-shadow flex h-60 flex-col justify-between border-2 bg-white py-3 px-4 ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
            >
              <div className="relative">
                {urlList.tag.map((tag) => (
                  <button
                    type="button"
                    className="rounded-lg bg-slate-600 px-2 py-1 text-xs text-white"
                  >
                    {`#${tag as string}`}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={(): void => {
                    onDelete(urlList.urlId).catch((error) =>
                      console.log(error)
                    );
                  }}
                >
                  <img
                    src={iconTrashPath}
                    alt="delete"
                    className="i-trash absolute top-0 right-0 cursor-pointer"
                  />
                </button>
              </div>
              <div className="urlList grid max-w-xs grid-cols-3 items-center justify-items-start gap-x-3 gap-y-1">
                <p className="w-max text-center leading-6">
                  <span className="text-[56px] font-bold">
                    {urlList.notRepeatTimes}
                  </span>
                  <br />
                  點擊次數
                </p>
                <button type="button">
                  <img src={iconChartPath} alt="chart" className="w-8" />
                </button>
                <button type="button" onClick={() => toggleEdit(urlList.urlId)}>
                  <img src={iconEditPath} alt="edit" className="w-8" />
                </button>
                <input
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    const inputValue = `https://${
                      (e.target as HTMLInputElement).value
                    }`;
                    navigator.clipboard
                      .writeText(inputValue)
                      .catch((error) => console.log(error));
                    window.open(inputValue, "_blank");
                  }}
                  value={`${baseShorten.replace("https://", "")}/${
                    urlList.shortUrl
                  }`}
                  className="col-span-3 max-w-xs cursor-pointer font-black underline sm:max-w-sm sm:text-xl"
                />
                <p className="col-span-3 h-10 max-h-10 select-all overflow-hidden break-all text-[4px] font-light selection:bg-third">
                  {urlList.url}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Outlet context={{ toggleEdit }} />
    </div>
  );
};

export default Shorten;

export function useShortenPages(): ShortenContext {
  return useOutletContext<ShortenContext>();
}
