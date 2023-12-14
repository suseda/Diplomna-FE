import {Pagination} from '@mui/material';
import {Stack} from '@mui/material';

interface PaginationInterface
{
    cnt: number
}

const PaginationComponent = (props: PaginationInterface) =>{

    return (
        <div>
            <Stack spacing={2}>
                <Pagination count={props.cnt} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    );
}

export default PaginationComponent;