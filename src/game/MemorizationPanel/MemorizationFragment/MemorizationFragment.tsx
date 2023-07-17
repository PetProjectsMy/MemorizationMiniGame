import classNames from 'classnames';
import { useMemo, useState, type FC } from 'react';
import { MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION } from '../constants';
import { MemorizationPanelContext } from '../types';
import './MemorizationFragment.css';

type Props = {
  fragmentIndex: number;
  memorizationPanelContext: MemorizationPanelContext;
};

export const MemorizationFragment: FC<Props> = ({
  memorizationPanelContext,
  fragmentIndex,
}) => {
  const [isHighlighted, setIsHighLighted] = useState(false);

  useMemo(() => {
    const toggleFragmentHighlighting = (isHighlighted?: boolean) => {
      setIsHighLighted(currentValue => {
        const nextValue = isHighlighted !== undefined ? isHighlighted : !currentValue;

        console.log(
          `TOGGLE FRAGMENT-${fragmentIndex} HIGHLIGHT : ${currentValue}->${nextValue}`,
        );

        return nextValue;
      });
    };

    memorizationPanelContext.toggleFragmentHighlighting[fragmentIndex] =
      toggleFragmentHighlighting;
  }, []);

  return (
    <div
      className={classNames('square-fragments-memorization-game__memorization-fragment', {
        'square-fragments-memorization-game__memorization-fragment_highlighted':
          isHighlighted,
      })}
      style={{
        transition: `${MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION}ms`,
      }}
    ></div>
  );
};
