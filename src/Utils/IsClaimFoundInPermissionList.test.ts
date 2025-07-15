import { MassfussionFunctionResponseDTO } from '../Models/RegistrationModels/Dto';
import { ResponseClaim } from '../Models/RegistrationModels/UserClaimsDTO';
import { IsClaimFoundInPermissionList } from './IsClaimFoundInPermissionList';

describe('IsClaimFoundInPermissionList', () => {
  it('should return true when the claim and details is found in the permission list', () => {
    const original: MassfussionFunctionResponseDTO = {
      applicationCode: 'app1',
      type: 'type1',
      claimValue: 'value1'
    };

    const claims: ResponseClaim[] = [
      { applicationCode: 'app1', claimType: 'type1', claimValue: 'value1' },
      { applicationCode: 'app2', claimType: 'type2', claimValue: 'value2' }
    ];

    const result = IsClaimFoundInPermissionList(original, claims);
    expect(result).toBe(true);
  });

  it('should return false when the claim and details is not found in the permission list', () => {
    const original: MassfussionFunctionResponseDTO = {
      applicationCode: 'app1',
      type: 'type1',
      claimValue: 'value1'
    };

    const claims: ResponseClaim[] = [
      { applicationCode: 'app2', claimType: 'type2', claimValue: 'value2' },
      { applicationCode: 'app3', claimType: 'type3', claimValue: 'value3' }
    ];

    const result = IsClaimFoundInPermissionList(original, claims);
    expect(result).toBe(false);
  });

  it('should return false when the permission list is empty', () => {
    const original: MassfussionFunctionResponseDTO = {
      applicationCode: 'app1',
      type: 'type1',
      claimValue: 'value1'
    };

    const claims: ResponseClaim[] = [];

    const result = IsClaimFoundInPermissionList(original, claims);
    expect(result).toBe(false);
  });
});