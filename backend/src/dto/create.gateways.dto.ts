export class CreateGatewaysDto{
  // @IsString()
  // @Length(1, 100)
  topic: string;

  // @IsInt()
  // @Min(1)
  // @Max(5)
  votesPerVoter: number;

  // @IsString()
  // @Length(1, 25)
  name: string;
  
}