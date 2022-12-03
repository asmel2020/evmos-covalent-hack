export interface NormalizedMetadata{
    name: string | null,
    description: string | null,
    animation_url: string | null,
    external_link: string | null,
    image: string | null,
    attributes:null | {}
}
                
export interface NftRespond{
        amount: string,
        block_number: string,
        block_number_minted: string,
        contract_type: string,
        last_metadata_sync: string,
        last_token_uri_sync: string,
        metadata:  string | null,
        minter_address: string | null,
        name: string,
        normalized_metadata: NormalizedMetadata,
        owner_of: string,
        symbol: string,
        token_address: string,
        token_hash: string,
        token_id: string | null,
        token_uri:  string | null,
}