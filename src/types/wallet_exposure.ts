interface ContributionValue {
  usd: number;
}

interface Entity {
  name: string;
  category: string;
  actor_id: number;
  is_primary_entity: boolean;
  is_vasp: boolean | null;
}

interface Contribution {
  contribution_percentage: number;
  contribution_value: ContributionValue;
  counterparty_percentage: number;
  counterparty_value: ContributionValue;
  entities: Entity[];
  is_screened_address: boolean;
  indirect_percentage: number;
  indirect_value: ContributionValue;
  min_number_of_hops: number;
}

interface BlockchainInfo {
  cluster: {
    inflow_value: ContributionValue;
    outflow_value: ContributionValue;
  };
}

interface RiskScoreDetail {
  destination: any;
  source: any;
}

interface EvaluationDetail {
  source: any[];
  destination: any[];
}

interface ClusterEntity {
  name: string;
  category: string;
  actor_id: number;
  is_primary_entity: boolean;
  is_vasp: boolean | null;
  is_after_sanction_date: boolean;
}

interface Customer {
  id: string;
  reference: string;
}

export interface ExposureData {
  analysed_by: {
    id: string;
    type: string;
  };
  cluster_entities: ClusterEntity[];
  id: string;
  screening_id: string;
  subject: {
    asset: string;
    hash: string;
    type: string;
    blockchain: string;
  };
  type: string;
  customer: Customer;
  created_at: string;
  updated_at: string;
  analysed_at: string;
  process_status: string;
  process_status_id: number;
  workflow_status_id: number;
  workflow_status: string;
  error: string | null;
  team_id: string;
  asset_tier: string;
  risk_score: number | null;
  blockchain_info: BlockchainInfo;
  risk_score_detail: RiskScoreDetail;
  evaluation_detail: EvaluationDetail;
  contributions: {
    source: Contribution[];
    destination: Contribution[];
  };
  triggered_rules: any[];
  changes: any;
  screening_source: string;
  detected_behaviors: any[];
}
