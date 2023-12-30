import { FC, useEffect } from "react";

import { Accordion } from "../../../components/Accordion";
import { ChooseBoxes } from "../../../components/ChooseBoxes";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { fetchData } from "../../../store/slices/homeSlice";

export const ReaderApi: FC = () => {
  const { dummyData } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      {dummyData &&
        dummyData.map((dataFromBackend: any) => {
          const { sectionName, data, sectionId, multiChoose, column }: any =
            dataFromBackend;
          if (!sectionName && !data && !sectionId) return;

          return (
            <Accordion
              title={sectionName?.toUpperCase() || "Accordion"}
              key={`"api-data-${sectionId}`}
            >
              <ChooseBoxes
                options={data}
                sectionId={sectionId}
                sectionName={sectionName}
                selectionMode={multiChoose === "multi" ? "multi" : "single"}
                column={!!column}
              />
            </Accordion>
          );
        })}
    </>
  );
};
