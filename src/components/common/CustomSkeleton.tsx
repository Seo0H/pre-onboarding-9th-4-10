import { Skeleton, Stack } from '@chakra-ui/react';
import LayoutWrapper from 'components/layout/LayoutWrapper';

const CustomSkeleton = () => {
  return (
    <LayoutWrapper height='100vh' padding={'2vw'} paddingTop={'10vw'}>
      <Stack>
        <Skeleton height='80px' bg='blue.500' color='white' marginBottom='1vh' />
        <Skeleton height='20px' bg='blue.500' color='white' />
        {[...Array(10)].map((e, idx) => (
          <Skeleton key={idx} height='60px' bg='blue.500' color='white' />
        ))}
      </Stack>
    </LayoutWrapper>
  );
};

export default CustomSkeleton;
