import { WorkoutAppError, FileValidationError, ErrorSeverity } from '../types/errors';

export class ExcelStructureValidator {
  private readonly REQUIRED_COLUMNS = [
    'Exercise',
    'Warm-up Sets',
    'Working Sets',
    'Reps',
    'RPE',
    'Rest'
  ];

  private readonly OPTIONAL_COLUMNS = [
    'Load',
    'Substitution Option 1',
    'Substitution Option 2',
    'Notes'
  ];

  private readonly DATA_TYPE_VALIDATORS = {
    'Warm-up Sets': (value: any) => this.validateNumber(value, 0, 10),
    'Working Sets': (value: any) => this.validateNumber(value, 1, 10),
    'RPE': (value: any) => this.validateNumber(value, 1, 10),
    'Rest': (value: any) => this.validateRestPeriod(value)
  };

  async validateWorkbook(workbook: XLSX.WorkBook): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    try {
      // Validate workbook structure
      await this.validateWorkbookStructure(workbook, errors, warnings);

      // Process each sheet
      for (const sheetName of workbook.SheetNames) {
        const sheet ▋