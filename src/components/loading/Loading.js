import { Spinner } from '@chakra-ui/react';

const Loading = ({ loading }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: '10000',
                justifyContent: 'center',
                alignItems: 'center',
                display: loading ? 'flex' : 'none',
                background: 'rgba(0, 0, 0, 0.4)',
            }}
        >
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </div>
    );
};

export default Loading;
