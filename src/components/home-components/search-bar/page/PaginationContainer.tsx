import { css } from '@emotion/react';
import PageButton from './PageButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { companyListAtoms, firstPageNumberInCurrentContainerSelector, lastPageNumberSelector, selectedPageNumberAtoms } from '../../../../recoil/atoms';
import { useEffect, useState } from 'react';

function PaginationContainer() {
  const setSelectedPageNumber = useSetRecoilState(selectedPageNumberAtoms);
  const firstPageNumberInCurrentContainer = useRecoilValue(firstPageNumberInCurrentContainerSelector);
  const lastPageNumber = useRecoilValue(lastPageNumberSelector);
  const [currentPageNumbers, setCurrentPageNumbers] = useState<string[]>([]);
  const companyList = useRecoilValue(companyListAtoms).companies;

  useEffect(() => {
    const result = [];

    for (let i = 1; i <= Math.min(lastPageNumber - firstPageNumberInCurrentContainer, 10); i++) {
      result.push(String(firstPageNumberInCurrentContainer + i));
    }

    setCurrentPageNumbers(result);
  }, [companyList, firstPageNumberInCurrentContainer]);

  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateColumns: `repeat(${4 + currentPageNumbers.length}, 1fr)`,
        gap: '0.2rem',
        justifySelf: 'center',
      })}
    >
      <PageButton
        text="<<"
        onClick={() => {
          setSelectedPageNumber(0);
        }}
      />
      <PageButton
        text="<"
        onClick={() => {
          setSelectedPageNumber(Math.max(firstPageNumberInCurrentContainer - 10, 0));
        }}
      />
      {currentPageNumbers.map((it) => {
        return (
          <PageButton
            key={it}
            text={it}
            onClick={() => {
              setSelectedPageNumber(Number(it) - 1);
            }}
          />
        );
      })}
      <PageButton
        text=">"
        onClick={() => {
          setSelectedPageNumber(Math.min(firstPageNumberInCurrentContainer + 10, lastPageNumber - 1));
        }}
      />
      <PageButton
        text=">>"
        onClick={() => {
          setSelectedPageNumber(lastPageNumber - (lastPageNumber % 10));
        }}
      />
    </div>
  );
}

export default PaginationContainer;
