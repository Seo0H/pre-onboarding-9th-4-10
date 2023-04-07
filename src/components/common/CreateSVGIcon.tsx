import { createIcon } from '@chakra-ui/icons';

export const LeftArrowOnce = createIcon({
  displayName: 'LeftArrowOnceIcon',
  viewBox: '-3 1 20 18',
  path: <path d='M-3.93403e-07 9L12 -9.60337e-07L12 18L-3.93403e-07 9Z' fill='#838383' />,
});

export const LeftArrowTwice = createIcon({
  displayName: 'LeftArrowOnceIcon',
  viewBox: '10 1 20 18',
  path: (
    <>
      <path d='M21 9L33 -5.24537e-07L33 18L21 9Z' fill='#838383' />
      <path d='M4 9L16 -5.24537e-07L16 18L4 9Z' fill='#838383' />
    </>
  ),
});

export const RightArrowOnce = createIcon({
  displayName: 'RightArrowOnceIcon',
  viewBox: '-5 1 20 18',
  path: <path d='M12 9L-1.66869e-07 -5.24537e-07L-9.53674e-07 18L12 9Z' fill='#838383' />,
});

export const RightArrowTwice = createIcon({
  displayName: 'LeftArrowTwiceIcon',
  viewBox: '3 1 20 18',
  path: (
    <>
      <path d='M12 9L-1.66869e-07 -5.24537e-07L-9.53674e-07 18L12 9Z' fill='#838383' />
      <path d='M29 9L17 -5.24537e-07L17 18L29 9Z' fill='#838383' />
    </>
  ),
});
