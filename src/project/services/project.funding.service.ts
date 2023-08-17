import { Injectable } from '@nestjs/common';
import { FundingsService } from '../fundings/fundings.service';

@Injectable()
export class ProjectFundingService {
    constructor(
        private readonly fundingsService: FundingsService,
    ) {}
}
